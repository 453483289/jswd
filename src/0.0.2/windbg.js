/*
UTF8占位
lib - windbg.js	help windbg javascript

function ( __MODULE__ , exports  , require , __FILE__  )
*/

// Role Check
var base = require("base");
if ( !base.FlagOn( base.GetRole() ,  base.JSRT_WINDBG ) )
{
	base.printf('[-] Not In Windbg Mode!\n');
	return 0;
}

var win32 = require("windows");
var DbgEng = require("DbgEng");

var assert = base.assert;
var isBoolean = base.isBoolean;
var isArray = base.isArray;
var isString = base.isString;
var isFunction = base.isFunction;
var isNumber = base.isNumber;
var isObject = base.isObject;
var isNull = base.isNull;
var isNullOrUndefined = base.isNullOrUndefined;
var isUndefined = base.isUndefined;
var isPointer = base.isPointer;
var Pointer = base.Pointer;
var LargeInteger2Pointer = base.LargeInteger2Pointer;

var isx64 = base.isx64;
var FlagOn = base.FlagOn


var printf = base.printf;
var KdPrint = base.KdPrint;
var sprintf = base.sprintf;

var setchar = base.setchar;
var setuchar = base.setuchar;
var setushort = base.setushort;
var setint = base.setint;
var setuint = base.setuint;
var setlong = base.setlong;
var setulong = base.setulong;
var setpointer = base.setpointer;
var setstring = base.setstring;

var getchar = base.getchar;
var getuchar = base.getuchar;
var getushort = base.getushort;
var getint = base.getint;
var getuint = base.getuint;
var getlong = base.getlong;
var getulong = base.getulong;
var getpointer = base.getpointer;
var getstring = base.getstring;

var cast2Boolean = base.cast2Boolean;
var cast2CHAR = base.cast2CHAR;
var cast2UCHAR = base.cast2UCHAR;
var cast2SHORT = base.cast2SHORT;
var cast2USHORT = base.cast2USHORT;
var cast2INT = base.cast2INT;
var cast2UINT = base.cast2UINT;
var cast2LONG = base.cast2LONG;
var cast2ULONG = base.cast2ULONG;
var cast2Pointer = base.cast2Pointer;
var cast2float = base.cast2float;
var cast2double = base.cast2double;

// ------------------------------------------------------
var __ROLE__CONTEXT = base.GetRoleContext();
var __ROLE__BINDS = base.GetRoleBinds();

// ------------------------------------------------------

// win32
const OS_UNKNOWN = win32.OS_UNKNOWN;

const OS_XP_SP0 = win32.OS_XP_SP0;		// 5.1	
const OS_XP_SP1 = win32.OS_XP_SP1;
const OS_XP_SP2 = win32.OS_XP_SP2;
const OS_XP_SP3 = win32.OS_XP_SP3;

const OS_2003_SP0 = win32.OS_2003_SP0;	// 5.2
const OS_2003_SP1 = win32.OS_2003_SP1;
const OS_2003_SP2 = win32.OS_2003_SP2;

const OS_VISTA_SP0 = win32.OS_VISTA_SP0;	// 6.0
const OS_VISTA_SP1 = win32.OS_VISTA_SP1;
const OS_VISTA_SP2 = win32.OS_VISTA_SP2;

const OS_2008_SP1 = win32.OS_2008_SP1;
const OS_2008_SP2 = win32.OS_2008_SP2;

const OS_2008_R2_SP0 = win32.OS_2008_R2_SP0; // 6.1
const OS_2008_R2_SP1 = win32.OS_2008_R2_SP1; 

const OS_7_SP0 = win32.OS_7_SP0;
const OS_7_SP1 = win32.OS_7_SP1;

const OS_2012 = win32.OS_2012;	// 6.2
const OS_8 = win32.OS_8;

const OS_2012_R2 = win32.OS_2012_R2;	 // 6.3
const OS_8DOT1 = win32.OS_8DOT1;

const OS_2016 = win32.OS_2016;	// 10.0

const OS_10TH1 = win32.OS_10TH1;
const OS_10TH2 = win32.OS_10TH2;
const OS_10RS1 = win32.OS_10RS1;

const OS_MAX = win32.OS_MAX;

var PathRemoveExtension = win32.PathRemoveExtension;

// -------------------------------------------------------------------

// Easy Debug Target type
const TARGET_KERNEL_MODE_LIVE = 1;
const TARGET_KERNEL_MODE_SMALL_DUMP = 2;
const TARGET_KERNEL_MODE_KERNEL_DUMP = 3;
const TARGET_KERNEL_MODE_FULL_DUMP = 4;
const TARGET_USER_MODE_LIVE = 5;
const TARGET_USER_MODE_SMALL_DUMP = 6;
const TARGET_USER_MODE_FULL_DUMP = 7;

exports.TARGET_KERNEL_MODE_LIVE = TARGET_KERNEL_MODE_LIVE;
exports.TARGET_KERNEL_MODE_SMALL_DUMP = TARGET_KERNEL_MODE_SMALL_DUMP;
exports.TARGET_KERNEL_MODE_KERNEL_DUMP = TARGET_KERNEL_MODE_KERNEL_DUMP;
exports.TARGET_KERNEL_MODE_FULL_DUMP = TARGET_KERNEL_MODE_FULL_DUMP;
exports.TARGET_USER_MODE_LIVE = TARGET_USER_MODE_LIVE;
exports.TARGET_USER_MODE_SMALL_DUMP = TARGET_USER_MODE_SMALL_DUMP;
exports.TARGET_USER_MODE_FULL_DUMP = TARGET_USER_MODE_FULL_DUMP;


const DEBUG_FORMAT_USER_SMALL_FULL_MEMORY              = 0x00000001;
const DEBUG_FORMAT_USER_SMALL_HANDLE_DATA              = 0x00000002;
const DEBUG_FORMAT_USER_SMALL_UNLOADED_MODULES         = 0x00000004;
const DEBUG_FORMAT_USER_SMALL_INDIRECT_MEMORY          = 0x00000008;
const DEBUG_FORMAT_USER_SMALL_DATA_SEGMENTS            = 0x00000010;
const DEBUG_FORMAT_USER_SMALL_FILTER_MEMORY            = 0x00000020;
const DEBUG_FORMAT_USER_SMALL_FILTER_PATHS             = 0x00000040;
const DEBUG_FORMAT_USER_SMALL_PROCESS_THREAD_DATA      = 0x00000080;
const DEBUG_FORMAT_USER_SMALL_PRIVATE_READ_WRITE_MEMORY= 0x00000100;
const DEBUG_FORMAT_USER_SMALL_NO_OPTIONAL_DATA         = 0x00000200;
const DEBUG_FORMAT_USER_SMALL_FULL_MEMORY_INFO         = 0x00000400;
const DEBUG_FORMAT_USER_SMALL_THREAD_INFO              = 0x00000800;
const DEBUG_FORMAT_USER_SMALL_CODE_SEGMENTS            = 0x00001000;
const DEBUG_FORMAT_USER_SMALL_NO_AUXILIARY_STATE       = 0x00002000;
const DEBUG_FORMAT_USER_SMALL_FULL_AUXILIARY_STATE     = 0x00004000;
const DEBUG_FORMAT_USER_SMALL_IGNORE_INACCESSIBLE_MEM  = 0x08000000;

// -----------------------------------------------
var g_pDebugClient = null;
var g_pDebugControl = null;
var g_pDebugDataSpaces = null;
var g_pDebugSymbols = null;
var g_pDebugRegisters = null;
var g_pDebugSystemObjects = null;

// -----------------------------------------------
exports.GetIDebugClient = function()
{
	return g_pDebugClient;
}

exports.GetIDebugControl = function()
{
	return g_pDebugControl;
}

exports.GetIDebugDataSpaces = function()
{
	return g_pDebugDataSpaces;
}

exports.GetIDebugSymbols = function()
{
	return g_pDebugSymbols;
}

exports.GetIDebugRegisters = function()
{
	return g_pDebugRegisters;
}

exports.GetIDebugSystemObjects = function()
{
	return g_pDebugSystemObjects;
}


// -----------------------------------------------
var g_nTargetType = 0;
var g_strTargetType = '';

// -----------------------------------------------
function __init__()
{
	var bFinalFlag = false;
	var bFlag = false;
	
	var pDebugClientPointer = LargeInteger2Pointer( __ROLE__CONTEXT['__raw_pDebugClientPointer'] );
	var pInterface = null;

	var nDebuggeeTypeClass = 0;
	var nDebuggeeTypeQualifier = 0;

	do
	{
		base.RegisterExitCallback( __clean__ );
		
		g_pDebugClient = new DbgEng.IDebugClient4( pDebugClientPointer );
		if ( !g_pDebugClient )
		{
			printf( '[-] DebugClient is init faild \n'); 
			break;
		}
		
		g_pDebugControl = new DbgEng.IDebugControl4( g_pDebugClient.QueryInterface( DbgEng.IID_IDebugControl4) );
		if ( !g_pDebugControl )
		{
			printf( '[-] DebugControl is init faild \n'); 
			break;
		}

		g_pDebugDataSpaces = new DbgEng.IDebugDataSpaces4( g_pDebugClient.QueryInterface( DbgEng.IID_IDebugDataSpaces4) );
		if ( !g_pDebugDataSpaces )
		{
			printf( '[-] g_pDebugDataSpaces is init faild \n'); 
			break;
		}
		
		g_pDebugSymbols = new DbgEng.IDebugSymbols3( g_pDebugClient.QueryInterface( DbgEng.IID_IDebugSymbols3) );
		if ( !g_pDebugSymbols )
		{
			printf( '[-] g_pDebugSymbols is init faild \n'); 
			break;
		}
		
		g_pDebugRegisters = new DbgEng.IDebugRegisters2( g_pDebugClient.QueryInterface( DbgEng.IID_IDebugRegisters2) );
		if ( !g_pDebugRegisters )
		{
			printf( '[-] g_pDebugRegisters is init faild \n'); 
			break;
		}
		
		g_pDebugSystemObjects = new DbgEng.IDebugSystemObjects4( g_pDebugClient.QueryInterface( DbgEng.IID_IDebugSystemObjects4) );
		if ( !g_pDebugSystemObjects )
		{
			printf( '[-] g_pDebugSystemObjects is init faild \n'); 
			break;
		}
		
		// ---------------------------------
		// Detect Debug Type
		nDebuggeeTypeClass = g_pDebugControl.GetDebuggeeTypeClass();
		nDebuggeeTypeQualifier = g_pDebugControl.GetDebuggeeTypeQualifier();
		
		// Check Suppored Debugee Type
		bFlag = false;
		if ( DbgEng.DEBUG_CLASS_KERNEL == nDebuggeeTypeClass )
		{
			if ( DbgEng.DEBUG_KERNEL_CONNECTION == nDebuggeeTypeQualifier )
			{
				g_strTargetType = 'live kernel-Mode';
				g_nTargetType = TARGET_KERNEL_MODE_LIVE;
				bFlag = true;
			}
			else if ( DbgEng.DEBUG_KERNEL_SMALL_DUMP == nDebuggeeTypeQualifier)
			{
				g_strTargetType = 'kernel-mode small dump';
				g_nTargetType = TARGET_KERNEL_MODE_SMALL_DUMP;
				bFlag = true;
			}
			else if ( DbgEng.DEBUG_KERNEL_DUMP == nDebuggeeTypeQualifier)
			{
				g_strTargetType = 'kernel-mode kernel dump';
				g_nTargetType = TARGET_KERNEL_MODE_KERNEL_DUMP;
				bFlag = true;
			}
			else if ( DbgEng.DEBUG_KERNEL_FULL_DUMP == nDebuggeeTypeQualifier)
			{
				g_strTargetType = 'kernel-mode complete dump';
				g_nTargetType = TARGET_KERNEL_MODE_FULL_DUMP;
				bFlag = true;
			}
		}
		else if ( DbgEng.DEBUG_CLASS_USER_WINDOWS == nDebuggeeTypeClass )
		{
			if ( DbgEng.DEBUG_USER_WINDOWS_PROCESS == nDebuggeeTypeQualifier )
			{
				g_strTargetType = 'live user-Mode';
				g_nTargetType = TARGET_USER_MODE_LIVE;
				bFlag = true;
			}
			else if ( DbgEng.DEBUG_USER_WINDOWS_SMALL_DUMP == nDebuggeeTypeQualifier )
			{
				g_strTargetType = 'user-mode minidump';
				g_nTargetType = TARGET_USER_MODE_SMALL_DUMP;
				bFlag = true;
			}
			else if ( DbgEng.DEBUG_USER_WINDOWS_DUMP == nDebuggeeTypeQualifier )
			{
				g_strTargetType = 'user-mode full Dump';
				g_nTargetType = TARGET_USER_MODE_FULL_DUMP;
				bFlag = true;
			}
		}
		
		if ( !bFlag )
		{
			KdPrint('[-] UnSupported Debugee Type Class = %d , Qualifier = %d \n' , nDebuggeeTypeClass , nDebuggeeTypeQualifier);
			break;
		}
		
		KdPrint('Debugee Type is "%s" \n' , g_strTargetType);
		
		bFinalFlag = true;
	}while(false);
	
	if ( !bFinalFlag )
	{
		_auto_clean();
	}
	
	return bFinalFlag;
}
__init__();

// -----------------------------------------------

// call from base!NotifyExitCallbacks
function __clean__()
{
	do
	{
		
		
		if ( !g_pDebugClient)
		{
			g_pDebugClient.SetEventCallbacks(null);
			g_pDebugClient.SetOutputCallbacks(null);
			g_pDebugClient.Release();
			g_pDebugClient = null;
		}

	}while(false);
	
	return 0;
}























// --------------------------------------------------------------------

function ReadVirtualChar(Param_Address , Param_Offset  )
{
	return g_pDebugDataSpaces.ReadVirtualChar( Param_Address , Param_Offset );
}
exports.ReadVirtualChar = ReadVirtualChar;

function ReadVirtualUChar(Param_Address , Param_Offset )
{
	return g_pDebugDataSpaces.ReadVirtualUChar( Param_Address , Param_Offset );
}
exports.ReadVirtualUChar = ReadVirtualUChar;

function ReadVirtualShort(Param_Address , Param_Offset , Param_bSwapBytes )
{
	return g_pDebugDataSpaces.ReadVirtualShort( Param_Address , Param_Offset , Param_bSwapBytes);
}
exports.ReadVirtualShort = ReadVirtualShort;

function ReadVirtualUShort(Param_Address , Param_Offset , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.ReadVirtualUShort( Param_Address , Param_Offset , Param_bSwapBytes);
}
exports.ReadVirtualUShort = ReadVirtualUShort;

function ReadVirtualInt(Param_Address , Param_Offset , Param_bSwapBytes )
{
	return g_pDebugDataSpaces.ReadVirtualInt( Param_Address , Param_Offset , Param_bSwapBytes);
}
exports.ReadVirtualInt = ReadVirtualInt;

function ReadVirtualUInt(Param_Address , Param_Offset , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.ReadVirtualUInt( Param_Address , Param_Offset , Param_bSwapBytes);
}
exports.ReadVirtualUInt = ReadVirtualUInt;


function ReadVirtualLong(Param_Address , Param_Offset , Param_bSwapBytes )
{
	return g_pDebugDataSpaces.ReadVirtualLong( Param_Address , Param_Offset , Param_bSwapBytes);
}
exports.ReadVirtualLong = ReadVirtualLong;

function ReadVirtualULong(Param_Address , Param_Offset , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.ReadVirtualULong( Param_Address , Param_Offset , Param_bSwapBytes);
}
exports.ReadVirtualULong = ReadVirtualULong;

function ReadVirtualPointer(Param_Address , Param_Offset  )
{
	return g_pDebugDataSpaces.ReadVirtualPointer( Param_Address , Param_Offset );
}
exports.ReadVirtualPointer = ReadVirtualPointer;

function ReadVirtualFloat(Param_Address , Param_Offset )
{
	return g_pDebugDataSpaces.ReadVirtualFloat( Param_Address , Param_Offset );
}
exports.ReadVirtualFloat = ReadVirtualFloat;


function ReadVirtualDouble(Param_Address , Param_Offset  )
{
	return g_pDebugDataSpaces.ReadVirtualDouble( Param_Address , Param_Offset );
}
exports.ReadVirtualDouble = ReadVirtualDouble;

function ReadVirtualStringA(Param_Address , Param_Offset , nMaxLength)
{
	return g_pDebugDataSpaces.ReadVirtualStringA( Param_Address , Param_Offset , nMaxLength);
}
exports.ReadVirtualStringA = ReadVirtualStringA;


function ReadVirtualStringW(Param_Address , Param_Offset , nMaxLength)
{
	return g_pDebugDataSpaces.ReadVirtualStringW( Param_Address , Param_Offset , nMaxLength);
}
exports.ReadVirtualStringW = ReadVirtualStringW;

// --------------------------------------------------------------------
function VirtualHexDump(pAddress, nSize)
{
	return g_pDebugDataSpaces.VirtualHexDump( pAddress, nSize);
}
exports.VirtualHexDump = VirtualHexDump;



// --------------------------------------------------------------------
function WriteVirtualChar(Param_Address , Param_Offset , nValue)
{
	return g_pDebugDataSpaces.WriteVirtualChar(Param_Address , Param_Offset , nValue);
}
exports.WriteVirtualChar = WriteVirtualChar;

function WriteVirtualUChar(Param_Address , Param_Offset , nValue)
{
	return g_pDebugDataSpaces.WriteVirtualUChar(Param_Address , Param_Offset , nValue);
}
exports.WriteVirtualUChar = WriteVirtualUChar;


function WriteVirtualShort(Param_Address , Param_Offset , nValue , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.WriteVirtualShort(Param_Address , Param_Offset , nValue , Param_bSwapBytes);
}
exports.WriteVirtualShort = WriteVirtualShort;

function WriteVirtualUShort(Param_Address , Param_Offset , nValue , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.WriteVirtualUShort(Param_Address , Param_Offset , nValue , Param_bSwapBytes);
}
exports.WriteVirtualUShort = WriteVirtualUShort;


function WriteVirtualInt(Param_Address , Param_Offset , nValue , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.WriteVirtualInt(Param_Address , Param_Offset , nValue , Param_bSwapBytes);
}
exports.WriteVirtualInt = WriteVirtualInt;

function WriteVirtualUInt(Param_Address , Param_Offset , nValue , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.WriteVirtualUInt(Param_Address , Param_Offset , nValue , Param_bSwapBytes);
}
exports.WriteVirtualUInt = WriteVirtualUInt;


function WriteVirtualLong(Param_Address , Param_Offset , nValue , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.WriteVirtualLong(Param_Address , Param_Offset , nValue , Param_bSwapBytes);
}
exports.WriteVirtualLong = WriteVirtualLong;

function WriteVirtualULong(Param_Address , Param_Offset , nValue , Param_bSwapBytes)
{
	return g_pDebugDataSpaces.WriteVirtualULong(Param_Address , Param_Offset , nValue , Param_bSwapBytes);
}
exports.WriteVirtualULong = WriteVirtualULong;


function WriteVirtualPointer(Param_Address , Param_Offset , nValue )
{
	return g_pDebugDataSpaces.WriteVirtualPointer(Param_Address , Param_Offset , nValue );
}
exports.WriteVirtualPointer = WriteVirtualPointer;

function WriteVirtualFloat(Param_Address , Param_Offset , nValue )
{
	return g_pDebugDataSpaces.WriteVirtualFloat(Param_Address , Param_Offset , nValue );
}
exports.WriteVirtualFloat = WriteVirtualFloat;

function WriteVirtualDouble(Param_Address , Param_Offset , nValue )
{
	return g_pDebugDataSpaces.WriteVirtualDouble(Param_Address , Param_Offset , nValue );
}
exports.WriteVirtualDouble = WriteVirtualDouble;


function WriteVirtualStringA(Param_Address , Param_Offset , strText )
{
	return g_pDebugDataSpaces.WriteVirtualStringA(Param_Address , Param_Offset , strText);
}
exports.WriteVirtualStringA = WriteVirtualStringA;

function WriteVirtualStringW(Param_Address , Param_Offset , strText )
{
	return g_pDebugDataSpaces.WriteVirtualStringW(Param_Address , Param_Offset , strText);
}
exports.WriteVirtualStringW = WriteVirtualStringW;

// --------------------------------------------------------------------
function GetRegChar(Param_Reg  )
{
	return g_pDebugRegisters.GetChar(Param_Reg );
}
exports.GetRegChar = GetRegChar;

function GetRegUChar(Param_Reg  )
{
	return g_pDebugRegisters.GetUChar(Param_Reg );
}
exports.GetRegUChar = GetRegUChar;

function GetRegShort(Param_Reg  )
{
	return g_pDebugRegisters.GetShort(Param_Reg );
}
exports.GetRegShort = GetRegShort;

function GetRegUShort(Param_Reg  )
{
	return g_pDebugRegisters.GetUShort(Param_Reg );
}
exports.GetRegUShort = GetRegUShort;

function GetRegInt(Param_Reg  )
{
	return g_pDebugRegisters.GetInt(Param_Reg );
}
exports.GetRegInt = GetRegInt;

function GetRegUInt(Param_Reg  )
{
	return g_pDebugRegisters.GetUInt(Param_Reg );
}
exports.GetRegUInt = GetRegUInt;

function GetRegLong(Param_Reg  )
{
	return g_pDebugRegisters.GetLong(Param_Reg );
}
exports.GetRegLong = GetRegLong;

function GetRegULong(Param_Reg  )
{
	return g_pDebugRegisters.GetULong(Param_Reg );
}
exports.GetRegULong = GetRegULong;

function GetRegPointer(Param_Reg  )
{
	return g_pDebugRegisters.GetPointer(Param_Reg );
}
exports.GetRegPointer = GetRegPointer;

function GetRegFloat(Param_Reg  )
{
	return g_pDebugRegisters.GetFloat(Param_Reg );
}
exports.GetRegFloat = GetRegFloat;

function GetRegDouble(Param_Reg  )
{
	return g_pDebugRegisters.GetDouble(Param_Reg );
}
exports.GetRegDouble = GetRegDouble;

// Set 
function SetRegChar(Param_Reg , Param_Value )
{
	return g_pDebugRegisters.SetChar(Param_Reg  , cast2CHAR(Param_Value) );
}
exports.SetRegChar = SetRegChar;

function SetRegUChar(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetUChar(Param_Reg , cast2UCHAR(Param_Value) );
}
exports.SetRegUChar = SetRegUChar;

function SetRegShort(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetShort(Param_Reg  , cast2SHORT(Param_Value) );
}
exports.SetRegShort = SetRegShort;

function SetRegUShort(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetUShort(Param_Reg  , cast2USHORT(Param_Value) );
}
exports.SetRegUShort = SetRegUShort;

function SetRegInt(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetInt(Param_Reg  , cast2INT(Param_Value) );
}
exports.SetRegInt = SetRegInt;

function SetRegUInt(Param_Reg , Param_Value  )
{
	return g_pDebugRegisters.SetUInt(Param_Reg , cast2UINT(Param_Value) );
}
exports.SetRegUInt = SetRegUInt;

function SetRegLong(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetLong(Param_Reg , cast2LONG(Param_Value) );
}
exports.SetRegLong = SetRegLong;

function SetRegULong(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetULong(Param_Reg  , cast2ULONG(Param_Value) );
}
exports.SetRegULong = SetRegULong;

function SetRegPointer(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetPointer(Param_Reg  , cast2Pointer(Param_Value) );
}
exports.SetRegPointer = SetRegPointer;

function SetRegFloat(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetFloat(Param_Reg , cast2float(Param_Value) );
}
exports.SetRegFloat = SetRegFloat;

function SetRegDouble(Param_Reg  , Param_Value )
{
	return g_pDebugRegisters.SetDouble(Param_Reg  , cast2double(Param_Value) );
}
exports.SetRegDouble = SetRegDouble;


function GetReg(Param_Reg , Param_Type )
{
	var nValue = 0;
	
	do
	{
		assert( isString(Param_Reg) );
		assert( isNullOrUndefined(Param_Type) || isString(Param_Type) );
		
		if ( ('char' == Param_Type) || ('CHAR' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetChar( Param_Reg );
		}
		else if ( ('uchar' == Param_Type) || ('UCHAR' == Param_Type) || ('byte' == Param_Type)  || ('BYTE' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetUChar( Param_Reg );
		}
		else if ( ('short' == Param_Type) || ('SHORT' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetShort( Param_Reg );
		}
		else if ( ('ushort' == Param_Type) || ('USHORT' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetUShort( Param_Reg );
		}
		else if ( ('int' == Param_Type) || ('INT' == Param_Type) || ('int32' == Param_Type) || ('INT32' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetInt( Param_Reg );
		}
		else if ( ('uint' == Param_Type) || ('UINT' == Param_Type) || ('uint32' == Param_Type) || ('UINT32' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetUInt( Param_Reg );
		}
		else if ( ('long' == Param_Type) || ('LONG' == Param_Type) || ('long32' == Param_Type) || ('LONG32' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetLong( Param_Reg );
		}
		else if ( ('ulong' == Param_Type) || ('ULONG' == Param_Type) || ('ulong32' == Param_Type) || ('ULONG32' == Param_Type)  )
		{
			nValue = g_pDebugRegisters.GetULong( Param_Reg );
		}
		else if ( ('pointer' == Param_Type) || ('POINTER' == Param_Type) )
		{
			nValue = g_pDebugRegisters.GetPointer( Param_Reg );
		}
		else if ( ('float' == Param_Type) || ('FLOAT' == Param_Type)  )
		{
			nValue = g_pDebugRegisters.GetFloat( Param_Reg );
		}
		else if ( ('double' == Param_Type) || ('DOUBLE' == Param_Type)  )
		{
			nValue = g_pDebugRegisters.GetDouble( Param_Reg );
		}
		else if ( ('al' == Param_Reg) 
			|| ('ah' == Param_Reg) 
			|| ('bl' == Param_Reg) 
			|| ('bh' == Param_Reg) 
			|| ('cl' == Param_Reg) 
			|| ('ch' == Param_Reg) 
			|| ('dl' == Param_Reg) 
			|| ('dh' == Param_Reg) 
		)
		{
			nValue = g_pDebugRegisters.GetUChar( Param_Reg );
		}
		else if ( ('ax' == Param_Reg) 
			|| ('bx' == Param_Reg) 
			|| ('cx' == Param_Reg) 
			|| ('dx' == Param_Reg) 
			|| ('sp' == Param_Reg) 
			|| ('bp' == Param_Reg) 
			|| ('di' == Param_Reg) 
			|| ('si' == Param_Reg) 
			|| ('ip' == Param_Reg) 
			|| ('flags' == Param_Reg) 
			|| ('cs' == Param_Reg) 
			|| ('ds' == Param_Reg) 
			|| ('es' == Param_Reg) 
			|| ('ss' == Param_Reg) 
			|| ('fs' == Param_Reg) 
			|| ('gs' == Param_Reg) 
		)
		{
			nValue = g_pDebugRegisters.GetUShort( Param_Reg );
		}
		else if ( ('eax' == Param_Reg) 
			|| ('ebx' == Param_Reg) 
			|| ('ecx' == Param_Reg) 
			|| ('edx' == Param_Reg) 
			|| ('esp' == Param_Reg) 
			|| ('ebp' == Param_Reg) 
			|| ('esi' == Param_Reg) 
			|| ('edi' == Param_Reg) 
			|| ('eip' == Param_Reg) 
		)
		{
			if ( IsPointer64Bit() )
			{
				nValue = g_pDebugRegisters.GetULong( Param_Reg );
			}
			else
			{
				nValue = g_pDebugRegisters.GetPointer( Param_Reg );
			}
		}
		else if ( ('eflags' == Param_Reg) 
			|| ('r8d' == Param_Reg) 
			|| ('r9d' == Param_Reg) 
			|| ('r10d' == Param_Reg) 
			|| ('r11d' == Param_Reg) 
			|| ('r12d' == Param_Reg) 
			|| ('r13d' == Param_Reg) 
			|| ('r14d' == Param_Reg) 
			|| ('r15d' == Param_Reg) 
		)
		{
			nValue = g_pDebugRegisters.GetULong( Param_Reg );
		}
		else if ( ('rax' == Param_Reg) 
			|| ('rbx' == Param_Reg) 
			|| ('rcx' == Param_Reg) 
			|| ('rdx' == Param_Reg) 
			|| ('rsp' == Param_Reg) 
			|| ('rbp' == Param_Reg) 
			|| ('rsi' == Param_Reg) 
			|| ('rdi' == Param_Reg) 
			|| ('rip' == Param_Reg) 
			|| ('rflags' == Param_Reg) 
			|| ('r8' == Param_Reg) 
			|| ('r9' == Param_Reg) 
			|| ('r10' == Param_Reg) 
			|| ('r11' == Param_Reg) 
			|| ('r12' == Param_Reg) 
			|| ('r13' == Param_Reg) 
			|| ('r14' == Param_Reg) 
			|| ('r15' == Param_Reg) 
			|| ('gdtr' == Param_Reg) 
			|| ('ldtr' == Param_Reg) 
		)
		{
			nValue = g_pDebugRegisters.GetPointer( Param_Reg );
		}
		else if ( ('mm0' == Param_Reg) 
			|| ('mm1' == Param_Reg) 
			|| ('mm2' == Param_Reg) 
			|| ('mm3' == Param_Reg) 
			|| ('mm4' == Param_Reg) 
			|| ('mm5' == Param_Reg) 
			|| ('mm6' == Param_Reg) 
			|| ('mm7' == Param_Reg) 
			|| ('fp0' == Param_Reg) 
			|| ('fp1' == Param_Reg) 
			|| ('fp2' == Param_Reg) 
			|| ('fp3' == Param_Reg) 
			|| ('fp4' == Param_Reg) 
			|| ('fp5' == Param_Reg) 
			|| ('fp6' == Param_Reg) 
			|| ('fp7' == Param_Reg) 
		)
		{
			nValue = g_pDebugRegisters.GetFloat( Param_Reg );
		}
		
		
	}while(false);
	
	return nValue;
}
exports.GetReg = SetReg;

function SetReg(Param_Reg , Param_Value )
{
	var nValue = 0;
	var ptrValue = null;
	var bFlag = false;
	
	do
	{
		assert( isString(Param_Reg) );
		assert( isNullOrUndefined(Param_Value) || isNumber(Param_Value) || isPointer(Param_Value) );
		
		if ( isNullOrUndefined(Param_Value) )
		{
			nValue = 0;
			ptrValue = null;
		}
		else if ( isNumber(Param_Value) )
		{
			nValue = Param_Value;
			ptrValue = new Pointer(Param_Value);
		}
		else if ( isPointer(Param_Value) )
		{
			nValue = cast2ULONG(Param_Value);
			ptrValue = Param_Value;
		}
			
		if ( ('al' == Param_Reg) 
			|| ('ah' == Param_Reg) 
			|| ('bl' == Param_Reg) 
			|| ('bh' == Param_Reg) 
			|| ('cl' == Param_Reg) 
			|| ('ch' == Param_Reg) 
			|| ('dl' == Param_Reg) 
			|| ('dh' == Param_Reg) 
		)
		{
			bFlag = g_pDebugRegisters.SetUChar( Param_Reg , nValue );
		}
		else if ( ('ax' == Param_Reg) 
			|| ('bx' == Param_Reg) 
			|| ('cx' == Param_Reg) 
			|| ('dx' == Param_Reg) 
			|| ('sp' == Param_Reg) 
			|| ('bp' == Param_Reg) 
			|| ('di' == Param_Reg) 
			|| ('si' == Param_Reg) 
			|| ('ip' == Param_Reg) 
			|| ('flags' == Param_Reg) 
			|| ('cs' == Param_Reg) 
			|| ('ds' == Param_Reg) 
			|| ('es' == Param_Reg) 
			|| ('ss' == Param_Reg) 
			|| ('fs' == Param_Reg) 
			|| ('gs' == Param_Reg) 
		)
		{
			bFlag = g_pDebugRegisters.SetUShort( Param_Reg , nValue  );
		}
		else if ( ('eax' == Param_Reg) 
			|| ('ebx' == Param_Reg) 
			|| ('ecx' == Param_Reg) 
			|| ('edx' == Param_Reg) 
			|| ('esp' == Param_Reg) 
			|| ('ebp' == Param_Reg) 
			|| ('esi' == Param_Reg) 
			|| ('edi' == Param_Reg) 
			|| ('eip' == Param_Reg) 
		)
		{
			if ( IsPointer64Bit() )
			{
				bFlag = g_pDebugRegisters.SetULong( Param_Reg , nValue);
			}
			else
			{
				bFlag = g_pDebugRegisters.SetPointer( Param_Reg , ptrValue );
			}
		}
		else if ( ('eflags' == Param_Reg) 
			|| ('r8d' == Param_Reg) 
			|| ('r9d' == Param_Reg) 
			|| ('r10d' == Param_Reg) 
			|| ('r11d' == Param_Reg) 
			|| ('r12d' == Param_Reg) 
			|| ('r13d' == Param_Reg) 
			|| ('r14d' == Param_Reg) 
			|| ('r15d' == Param_Reg) 
		)
		{
			bFlag = g_pDebugRegisters.SetULong( Param_Reg , nValue);
		}
		else if ( ('rax' == Param_Reg) 
			|| ('rbx' == Param_Reg) 
			|| ('rcx' == Param_Reg) 
			|| ('rdx' == Param_Reg) 
			|| ('rsp' == Param_Reg) 
			|| ('rbp' == Param_Reg) 
			|| ('rsi' == Param_Reg) 
			|| ('rdi' == Param_Reg) 
			|| ('rip' == Param_Reg) 
			|| ('rflags' == Param_Reg) 
			|| ('r8' == Param_Reg) 
			|| ('r9' == Param_Reg) 
			|| ('r10' == Param_Reg) 
			|| ('r11' == Param_Reg) 
			|| ('r12' == Param_Reg) 
			|| ('r13' == Param_Reg) 
			|| ('r14' == Param_Reg) 
			|| ('r15' == Param_Reg) 
		)
		{
			bFlag = g_pDebugRegisters.SetPointer( Param_Reg , ptrValue );
		}
		else if ( ('mm0' == Param_Reg) 
			|| ('mm1' == Param_Reg) 
			|| ('mm2' == Param_Reg) 
			|| ('mm3' == Param_Reg) 
			|| ('mm4' == Param_Reg) 
			|| ('mm5' == Param_Reg) 
			|| ('mm6' == Param_Reg) 
			|| ('mm7' == Param_Reg) 
			|| ('fp0' == Param_Reg) 
			|| ('fp1' == Param_Reg) 
			|| ('fp2' == Param_Reg) 
			|| ('fp3' == Param_Reg) 
			|| ('fp4' == Param_Reg) 
			|| ('fp5' == Param_Reg) 
			|| ('fp6' == Param_Reg) 
			|| ('fp7' == Param_Reg) 
		)
		{
			bFlag = g_pDebugRegisters.SetFloat( Param_Reg , nValue );
		}
		
		
	}while(false);
	
	return bFlag;
}
exports.SetReg = SetReg;


// --------------------------------------------------------------------
// Get Address By Symbol Name
function GetSymbolAddress( strSymbolName )
{
	var pAddress = null;
	var ModuleArray = null;
	var nIndex = 0;
	
	var strFixedName = '';
	
	do
	{
		if ( -1 == strSymbolName.indexOf('!') )
		{
			ModuleArray = GetLoadedModules();
			if ( !ModuleArray )
			{
				break;
			}
			
			for ( nIndex = 0; nIndex < ModuleArray.length; nIndex++ )
			{
				strFixedName = sprintf('%s!%s' , ModuleArray[nIndex].ModuleName , strSymbolName );
				
				pAddress = g_pDebugSymbols.GetOffsetByName(strFixedName);
				if ( pAddress) 
				{
					break;
				}
				else
				{
					KdPrint("%s not in %s\n" , strSymbolName , ModuleArray[nIndex].ModuleName );
				}
			}
		}
		else
		{
			pAddress = g_pDebugSymbols.GetOffsetByName(strSymbolName);
		}

	}while(false);
	
	return pAddress;
}
exports.GetSymbolAddress = GetSymbolAddress;

function GetAddressSymbol( Param_Address , Param_bUseOffsetName )
{
	var FinalRet = null;
	var pAddress = null;
	var strSymbolName = '';
	
	var ModuleArray = null;
	var nIndex = 0;
	
	var strImageName = '';
	var strWithoutExt = '';
	var nImageSize = 0;
	var pImageBase = null;
	var pImageMax = null;
	
	var pOffset = null;
	var bUseOffsetName = false;
	
	do
	{
		assert( isString(Param_Address) || isPointer(Param_Address) || isNumber(Param_Address) );
		assert( isNullOrUndefined(Param_bUseOffsetName) || isBoolean(Param_bUseOffsetName) );
		
		if ( isString(Param_Address) )
		{
			pAddress = new Pointer(Param_Address);
		}
		else if ( isPointer(Param_Address) )
		{
			pAddress = Param_Address;
		}
		else if ( isNumber(Param_Address) )
		{
			pAddress = new Pointer(Param_Address);
		}
		
		if ( !pAddress)
		{
			break;
		}
		
		if ( isNullOrUndefined(Param_bUseOffsetName) )
		{
			bUseOffsetName = false;
		}
		else if ( isBoolean(Param_bUseOffsetName) )
		{
			bUseOffsetName = Param_bUseOffsetName;
		}
		
		strSymbolName = g_pDebugSymbols.GetNameByOffset( pAddress );
		if ( !strSymbolName )
		{
			// Try a ImageBase + offset name
			
			if ( !bUseOffsetName )
			{
				break;
			}
			
			ModuleArray = GetLoadedModules();
			if ( !ModuleArray )
			{
				break;
			}
			
			for ( nIndex = 0; nIndex < ModuleArray.length; nIndex++ )
			{
				strImageName = ModuleArray[nIndex].ImageName;
				pImageBase = ModuleArray[nIndex].ImageBase;
				nImageSize = ModuleArray[nIndex].ImageSize;
				
				pImageMax = pImageBase.add( nImageSize );
				
				if ( ( pAddress.cmp(pImageBase) >= 0 ) && ( pAddress.cmp(pImageMax) <= 0 ) )
				{
					pOffset = pAddress.sub(pImageBase);
					
					if ( pOffset )
					{
						FinalRet = sprintf('%s+0x%p' , strImageName , pOffset );
					}
					else
					{
						FinalRet = strImageName;
					}
				}
			}
			
		}
		else
		{
			FinalRet = strSymbolName;
		}
		
	}while(false);
	
	return FinalRet;
}
exports.GetAddressSymbol = GetAddressSymbol;

function GetFieldOffset( Param_strName  )
{
	var strType = '';
	var strField = '';
	var nPos = 0;
	var nOffset = -1;
	
	var strTemp = '';
	var strModuleName = '';
	
	var pModuleBase = null;
	var ModuleArray = null;
	var nIndex = 0;
	
	do
	{
		nPos = Param_strName.indexOf('.');
		if ( -1 == nPos )
		{
			KdPrint("[GetFieldOffset] invalid param %s\n" , Param_strName );
			break;
		}
			
		nPos = Param_strName.indexOf('!');
		if ( -1 != nPos)
		{
			if ( nPos == Param_strName.length - 1 )
			{
				break;
			}
			
			strModuleName = Param_strName.substring(0 , nPos );
			strTemp = Param_strName.substring( nPos + 1 , Param_strName.length );
			
			nPos = strTemp.indexOf('.');
			if ( -1 == nPos )
			{
				break;
			}
			
			if ( nPos == strTemp.length - 1 )
			{
				break;
			}
			
			strType = strTemp.substring( 0 , nPos);
			strField = strTemp.substring( nPos + 1 , strTemp.length );
			
		}
		else
		{
			// not specifec module , 
			
			nPos = Param_strName.indexOf('.');
			if ( -1 == nPos )
			{
				break;
			}
			
			if ( nPos == Param_strName.length - 1 )
			{
				break;
			}
			
			strType = Param_strName.substring( 0 , nPos);
			strField = Param_strName.substring( nPos + 1 , Param_strName.length );
		}
		
		
		if ( 0 == strModuleName.length )
		{
			ModuleArray = GetLoadedModules();
			if ( !ModuleArray )
			{
				break;
			}
			
			for ( nIndex = 0; nIndex < ModuleArray.length; nIndex++ )
			{
				strModuleName = ModuleArray[nIndex].ModuleName;
				
				nOffset = g_pDebugSymbols.GetFieldOffset(  strModuleName , strType , strField );
				if ( nOffset >= 0 )
				{
					break;
				}

			}
		}
		else
		{
			nOffset = g_pDebugSymbols.GetFieldOffset(strModuleName , strType , strField );
		}
		
	}while(false);
	
	return nOffset;
}
exports.GetFieldOffset = GetFieldOffset;

function ReloadModule( strModuleName )
{
	return g_pDebugSymbols.Reload( strModuleName );
}
exports.ReloadModule = ReloadModule;


function GetLoadedModules()
{
	var nLoadedModules = 0;
	var nIndex = 0;
	var stModuleNode = null;
	
	var FinalRet = null;
	var ModuleArray = [];
	
	do
	{
		nLoadedModules = g_pDebugSymbols.GetNumberOfLoadedModules();
		if ( 0 == nLoadedModules)
		{
			break;
		}
			
		for ( nIndex = 0; nIndex < nLoadedModules; nIndex++ )
		{
			stModuleNode = {};
			
			stModuleNode.ModuleBase = g_pDebugSymbols.GetModuleByIndex(nIndex);
			stModuleNode.ModuleName = g_pDebugSymbols.GetModuleNameByIndex(nIndex);
			
			
			stModuleNode.ImageBase = stModuleNode.ModuleBase;
			stModuleNode.ImageSize = g_pDebugSymbols.GetModuleSize( stModuleNode.ModuleBase );
			
			
			stModuleNode.ImageName = stModuleNode.ModuleName;
			stModuleNode.ImagePath = g_pDebugSymbols.GetModuleImageNameByIndex(nIndex);
			
			ModuleArray.push( stModuleNode );
		}
		
		if ( 0 != ModuleArray.length )
		{
			FinalRet = ModuleArray;
		}
		
	}while(false);
	
	return FinalRet;
}
exports.GetLoadedModules = GetLoadedModules;

function GetImageBase( strName )
{
	var ModuleArray = null;
	var nIndex = 0;
	var stModuleNode = null;
	var strFindName = '';
	var pImageBase = null;
	
	do
	{
		assert( isString(strName) );
		
		strFindName = strName.toLowerCase();
		
		ModuleArray = GetLoadedModules();
		if ( !ModuleArray )
		{
			break;
		}
		
		for ( nIndex = 0; nIndex < ModuleArray.length ; nIndex++ )
		{
			stModuleNode = ModuleArray[nIndex];
			
			if ( strFindName == stModuleNode.ModuleName.toLowerCase() 
				|| strFindName == stModuleNode.ImageName.toLowerCase() 
			)
			{
				pImageBase = stModuleNode.ImageBase;
				break;
			}
			
		}
		
	}while(false);
	
	return pImageBase;
}
exports.GetImageBase = GetImageBase;

function ExecuteCommand( strCommand )
{
	return g_pDebugControl.Execute(strCommand);
}
exports.ExecuteCommand = ExecuteCommand;

function CONTAINING_RECORD( pFieldAddress , strType , strField )
{
	var pTypeAddress = null;
	var nOffset = 0;
	
	do
	{
		assert( isPointer(pFieldAddress)  );
		assert( isString(strType)  );
		assert( isString(strField)  );
		
		nOffset = GetFieldOffset( sprintf('%s.%s' , strType , strField) );
		if ( 0 == nOffset )
		{
			break;
		}
		
		pTypeAddress = pFieldAddress.sub( nOffset );
		
	}while(false);
	
	return pTypeAddress;
}
exports.CONTAINING_RECORD = CONTAINING_RECORD;


function PsGetCurrentThread()
{
	return g_pDebugSystemObjects.GetCurrentThreadDataOffset();
}
exports.PsGetCurrentThread = PsGetCurrentThread;
exports.KeGetCurrentThread = PsGetCurrentThread;

function NtCurrentTeb()
{
	return g_pDebugSystemObjects.GetCurrentThreadDataOffset();
}
exports.NtCurrentTeb = NtCurrentTeb;

function PsGetCurrentProcess()
{
	return g_pDebugSystemObjects.GetCurrentProcessDataOffset();
}
exports.PsGetCurrentProcess = PsGetCurrentProcess;

function NtCurrentPeb()
{
	return g_pDebugSystemObjects.GetCurrentProcessDataOffset();
}
exports.NtCurrentPeb = NtCurrentPeb;

function PsGetThreadWin32Thread( Param_pThread )
{
	var nOffset = 0;
	var pWin32Thread = null;
	var pThread = null;
	
	do
	{
		pThread = cast2Pointer(Param_pThread);
		
		nOffset = GetFieldOffset("nt!_KTHREAD.Win32Thread");
		if ( 0 == nOffset )
		{
			break;
		}
		
		pWin32Thread = ReadVirtualPointer(pThread , nOffset );
		
	}while(false);
	
	return pWin32Thread;
}
exports.PsGetThreadWin32Thread = PsGetThreadWin32Thread;

function PsGetCurrentWin32Thread()
{
	return PsGetThreadWin32Thread( PsGetCurrentThread() );
}
exports.PsGetCurrentWin32Thread = PsGetCurrentWin32Thread;

function GetImplicitProcess()
{
	return g_pDebugSystemObjects.GetImplicitProcessDataOffset();
}
exports.GetImplicitProcess = GetImplicitProcess;

function SetImplicitProcess( pPEBOrPEProcess )
{
	assert( isPointer(pPEBOrPEProcess) );

	return g_pDebugSystemObjects.SetImplicitProcessDataOffset( pPEBOrPEProcess );
}
exports.SetImplicitProcess = SetImplicitProcess;

function GetImplicitThread()
{
	return g_pDebugSystemObjects.GetImplicitThreadDataOffset();
}
exports.GetImplicitThread = GetImplicitThread;

function SetImplicitThread( pTEBOrPEThread )
{
	assert( isPointer(pTEBOrPEThread) );

	return g_pDebugSystemObjects.SetImplicitThreadDataOffset( pTEBOrPEThread );
}
exports.SetImplicitThread = SetImplicitThread;

function PsGetActiveProcessList()
{
	var PsActiveProcessHead = null;
	var pFirstEntry = null;
	var pNextEntry = null;
	var FinalRet = null;
	
	var pEntry = null;
	var pProcess = null;
	var nOffset = 0;

	var ActiveProcess = [];
	
	do
	{
		PsActiveProcessHead = GetSymbolAddress('nt!PsActiveProcessHead');
		
		pFirstEntry = ReadVirtualPointer(PsActiveProcessHead , 0x00);
		
		nOffset = GetFieldOffset( 'nt!_EPROCESS.ActiveProcessLinks');
		if ( 0 == nOffset )
		{
			KdPrint("GetFieldOffset nt!_EPROCESS.ActiveProcessLinks faild\n");
			break;
		}

		for ( pEntry = pFirstEntry; ( 0 != PsActiveProcessHead.cmp(pEntry) ); pEntry = pNextEntry )
		{
			pProcess = pEntry.sub(nOffset);

			ActiveProcess.push( pProcess );
			
			pNextEntry = ReadVirtualPointer(pEntry , 0x00);
		}
		
	}while(false);
	
	if ( ActiveProcess.length != 0 )
	{
		FinalRet = ActiveProcess;
	}
	
	return FinalRet;
}
exports.PsGetActiveProcessList = PsGetActiveProcessList;

function PsLookupProcessByProcessImageName( strImageName )
{
	var ActiveProcess = null;
	var nIndex = 0;
	var pProcess = null;
	var FinalRet = null;
	
	var OFFSET_EPROCESS_ImageFileName = 0;
	var strText = '';
	
	do
	{
		assert( isString(strImageName) );
		
		ActiveProcess = PsGetActiveProcessList();
		if ( !ActiveProcess )
		{
			break;
		}
		
		OFFSET_EPROCESS_ImageFileName = GetFieldOffset( 'nt!_EPROCESS.ImageFileName' );
		if ( 0 == OFFSET_EPROCESS_ImageFileName )
		{
			break;
		}
		
		for ( nIndex = 0; nIndex < ActiveProcess.length; nIndex++ )
		{
			pProcess = ActiveProcess[nIndex];
			
			strText = ReadVirtualStringA(pProcess , OFFSET_EPROCESS_ImageFileName , 15 );
			if ( strText.toLowerCase() == strImageName.toLowerCase() )
			{
				FinalRet = pProcess;
				break;
			}
		}
		
	}while(false);
	
	return FinalRet;
}
exports.PsLookupProcessByProcessImageName = PsLookupProcessByProcessImageName;

//----------------------------------------------------------------------------------------
function WriteDumpFile(Param_strDumpFile , Param_Qualifier , Param_Comment)
{
	var nQualifier = 0;
	var nFormatFlags = 0;
	var nFinalRet = -1;
	var strComment = '';

	do
	{
		assert( isString(Param_strDumpFile) );
		assert( isString(Param_Qualifier) || isNumber(Param_Qualifier) || isNullOrUndefined(Param_Qualifier) );
		assert( isString(Param_Comment) || isNullOrUndefined(Param_Comment) );
		
		if ( isString(Param_Comment) )
		{
			strComment = Param_Comment;
		}
		else
		{
			strComment = '';
		}
		
		if ( TARGET_KERNEL_MODE_LIVE == g_nTargetType )
		{
			if ( isNumber(Param_Qualifier) )
			{
				nQualifier = Param_Qualifier;
			}
			else if ( isString(Param_Qualifier) )
			{
				if ( 'small' == Param_Qualifier.toLowerCase() )
				{
					nQualifier = DbgEng.DEBUG_KERNEL_SMALL_DUMP;
				}
				else if ( 'default' == Param_Qualifier.toLowerCase() )
				{
					nQualifier = DbgEng.DEBUG_KERNEL_SMALL_DUMP;
				}
				else if ( 'kernel' == Param_Qualifier.toLowerCase() )
				{
					nQualifier = DbgEng.DEBUG_KERNEL_DUMP; // will ret 0x0x80070057 , i don't known why?
				}
				else if ( 'full' == Param_Qualifier.toLowerCase() )
				{
					nQualifier = DbgEng.DEBUG_KERNEL_FULL_DUMP;
				}
				else
				{
					KdPrint('Unknown Dump Type %s \n' , Param_Qualifier );
					break;
				}
			}
			else if ( isUndefined(Param_Qualifier) )
			{
				nQualifier = DbgEng.DEBUG_KERNEL_SMALL_DUMP;
			}
			
			nFinalRet = g_pDebugClient.WriteDumpFile2( Param_strDumpFile , strComment , nQualifier , 0 );
			
			//KdPrint('WriteDumpFile %d Type 0x%08X \n' , nQualifier , nFinalRet );
		}
		else if ( TARGET_KERNEL_MODE_SMALL_DUMP == g_nTargetType )
		{
		
		}
		else if ( TARGET_KERNEL_MODE_KERNEL_DUMP == g_nTargetType )
		{
		
		}
		else if ( TARGET_KERNEL_MODE_FULL_DUMP == g_nTargetType )
		{
		
		}
		else if ( TARGET_USER_MODE_LIVE == g_nTargetType )
		{
			if ( isNumber(Param_Qualifier) )
			{
				nQualifier = Param_Qualifier;
			}
			else if ( isString(Param_Qualifier) )
			{
				if ( 'small' == Param_Qualifier.toLowerCase() )
				{
					nQualifier = DbgEng.DEBUG_USER_WINDOWS_SMALL_DUMP;
					nFormatFlags = DEBUG_FORMAT_USER_SMALL_FULL_MEMORY;
				}
				else if ( 'default' == Param_Qualifier.toLowerCase() )
				{
					nQualifier = DbgEng.DEBUG_USER_WINDOWS_DUMP;
					//User full dumps do not support comments
					strComment = '';
					nFormatFlags = 0;
				}
				else if ( 'full' == Param_Qualifier.toLowerCase() )
				{
					nQualifier = DbgEng.DEBUG_USER_WINDOWS_DUMP;
					//User full dumps do not support comments
					strComment = '';
					nFormatFlags = 0;
				}
				else
				{
					KdPrint('Unknown Dump Type %s \n' , Param_Qualifier );
					break;
				}
			}
			else if ( isUndefined(Param_Qualifier) )
			{
				nQualifier = DbgEng.DEBUG_USER_WINDOWS_DUMP;
				//User full dumps do not support comments
				strComment = '';
				nFormatFlags = 0;
			}
			
			nFinalRet = g_pDebugClient.WriteDumpFile2( Param_strDumpFile , strComment , nQualifier , nFormatFlags );
			
			//KdPrint('WriteDumpFile %d Type 0x%08X \n' , nQualifier , nFinalRet );
		}
		else if ( TARGET_USER_MODE_SMALL_DUMP == g_nTargetType )
		{
			
		}
		else if ( TARGET_USER_MODE_FULL_DUMP == g_nTargetType )
		{
			
		}
	
	}while(false);
	
	return nFinalRet;
}
exports.WriteDumpFile = WriteDumpFile;

function CallExtension( strExtName ,  strFunction , Param_Arguments )
{
	return g_pDebugControl.CallExtension( strExtName , strFunction , Param_Arguments );
}
exports.CallExtension = CallExtension;

function GetSystemVersion()
{
	return g_pDebugControl.GetSystemVersion();
}
exports.GetSystemVersion = GetSystemVersion;

function IsPointer64Bit()
{
	return g_pDebugControl.IsPointer64Bit();
}
exports.IsPointer64Bit = IsPointer64Bit;


function __frame()
{
	do
	{
		if ( TARGET_KERNEL_MODE_LIVE == g_nTargetType )
		{
		
		}
		else if ( TARGET_KERNEL_MODE_SMALL_DUMP == g_nTargetType )
		{
		
		}
		else if ( TARGET_KERNEL_MODE_KERNEL_DUMP == g_nTargetType )
		{
		
		}
		else if ( TARGET_KERNEL_MODE_FULL_DUMP == g_nTargetType )
		{
		
		}
		else if ( TARGET_USER_MODE_LIVE == g_nTargetType )
		{
			
		}
		else if ( TARGET_USER_MODE_SMALL_DUMP == g_nTargetType )
		{
			
		}
		else if ( TARGET_USER_MODE_FULL_DUMP == g_nTargetType )
		{
			
		}
	
	}while(false);
	
	return 0;
}
exports.__frame = __frame;

// --------------------------------------------------------------------
















//

function main(argv)
{

	do
	{
		//var nRet = CallExtension( "kdexts" , "Process" , '0xfffff980001bab10' );
		
		//printf("nRet = 0x%08X \n" , nRet);
		
	
		//ReloadModule("win32k.sys");
		
		var pAddress = GetSymbolAddress("nt!PsActiveProcessHead");
		
		printf( "nt!PsActiveProcessHead = %s\n" , pAddress  );
		
		printf( "0x%p = %s\n" , pAddress , GetAddressSymbol(pAddress)  );
		
	
		printf( "nt!_KPRCB.CurrentThread = %d\n" , GetFieldOffset("nt!_KPRCB.CurrentThread" ) );
		
		printf("%s\n" , PsGetActiveProcessList() );
		
		printf( "PsLookupProcessByProcessImageName explorer.exe = %p\n" , PsLookupProcessByProcessImageName('explorer.exe') );
		

	}while (false);
	
	return 0;
}
exports.main = main;


// --------------------------------------------------------------------